import os
import django
import faker
from django.contrib.auth.models import User
from profiles.models import UserProfile, AreasOfInterest

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

fake = faker.Faker()

# Create fake AreasOfInterest
areas_of_interest = [
    "Technology and Innovation",
    "Business and Management",
    "Healthcare and Medicine",
    "Engineering and Manufacturing",
    "Finance and Economics",
    "Education and Training",
    "Legal and Regulatory Affairs",
    "Environmental and Sustainability Issues",
    "Creative Industries",
    "Science and Research",
    "Human Resources and Organizational Behavior",
    "Information Technology and Data Analysis",
    "Public Policy and Governance",
    "Arts and Culture",
    "Real Estate and Urban Planning",
    "Hospitality and Tourism",
    "Transportation and Logistics",
    "Sports and Fitness",
]

for interest in areas_of_interest:
    AreasOfInterest.objects.create(name=interest)

# Create fake UserProfiles
for _ in range(25):
    user = User.objects.create_user(username=fake.user_name(), password=fake.password())
    profile = UserProfile(
        user=user,
        designation=fake.job(),
        company=fake.company(),
        about=fake.text(),
        display_picture=fake.image_url(width=100, height=100),
    )
    profile.save()

    interests = fake.random_elements(elements=areas_of_interest, length=fake.random_int(min=2, max=4, step=1))
    for interest in interests:
        profile.areas_of_interest.add(AreasOfInterest.objects.get(name=interest))

print("Database populated with fake data.")