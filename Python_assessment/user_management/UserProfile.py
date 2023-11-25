from django.db import models
from django.contrib.auth.models import User
import faker

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    designation = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    about = models.TextField()
    areas_of_interest = models.ManyToManyField('AreasOfInterest')
    display_picture = models.ImageField(upload_to='profile_pictures/')

class AreasOfInterest(models.Model):
    name = models.CharField(max_length=100)
    
    
def save(self, *args, **kwargs):
        if not self.about:
            self.about = faker.Faker().text()
        super(UserProfile, self).save(*args, **kwargs)
