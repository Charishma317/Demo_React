from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import UserProfile

@login_required
def profile(request):
    profile = UserProfile.objects.get(user=request.user)
    return render(request, 'profiles/profile.html', {'profile': profile})