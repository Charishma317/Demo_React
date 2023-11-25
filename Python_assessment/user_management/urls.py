from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.profile, name='profile'),
]


from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('', include('profiles.urls')),
]