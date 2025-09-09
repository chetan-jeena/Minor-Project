from django.shortcuts import render
from .models import MyUser

# Create your views here.

def register(request):
    return render(request, 'users/register.html')

def owner_register(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username = request.POST.get('username')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        dob = request.POST.get('dob')
        aadhar_no = request.POST.get('aadhar')
        password = request.POST.get('password1')
        confirm_password = request.POST.get('password2')
        if password != confirm_password:
            return render(request, 'users/owner/register.html', {'error': 'Passwords do not match'})
        image = request.FILES.get('image')
        location = request.POST.get('address')

        
        if MyUser.objects.filter(username=username).exists():
            return render(request, 'users/owner/register.html', {'error': 'Username already exists'})
        if MyUser.objects.filter(email=email).exists():
            return render(request, 'users/owner/register.html', {'error': 'Email already exists'})
        if MyUser.objects.filter(phone=phone).exists():
            return render(request, 'users/owner/register.html', {'error': 'Phone number already exists'})
        if aadhar_no and MyUser.objects.filter(aadhar_card=aadhar_no).exists():
            return render(request, 'users/owner/register.html', {'error': 'Aadhar number already exists'})
        # Create the OwnerProfile object
        owner_profile = MyUser(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            phone=phone,
            date_of_birth=dob,
            aadhar_card=aadhar_no,
            
            profile_image=image,
            address=location,
            is_owner=True
        )
        owner_profile.set_password(password)
        owner_profile.save()
        return render(request, 'users/owner/register.html', {'success': 'Registration successful'})
    return render(request, 'users/owner/register.html')