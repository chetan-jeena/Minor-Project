from django.shortcuts import render,redirect
from .models import MyUser
from django.contrib.auth import logout, login, authenticate
from django.http import HttpResponse

# Create your views here.
def user_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            user = MyUser.objects.get(email=email)
            if user.check_password(password):
                # Login successful
                if user.is_owner:
                    # return render(request, 'users/owner/dashboard.html', {'user': user})
                    return HttpResponse("Owner dashboard is under construction.")
                else:
                    # return render(request, 'users/client/dashboard.html', {'user': user})
                    return HttpResponse("Client dashboard is under construction.")
            else:
                return render(request, 'users/login.html', {'error': 'Invalid password'})
        except MyUser.DoesNotExist:
            return render(request, 'users/login.html', {'error': 'User does not exist'})
    return render(request, 'users/login.html')
def client_register(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username = request.POST.get('username')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        dob = request.POST.get('dob')
        password = request.POST.get('password1')
        confirm_password = request.POST.get('password2')
        if password != confirm_password:
            return render(request, 'users/register.html', {'error': 'Passwords do not match'})
        address = request.POST.get('address')

        
        if MyUser.objects.filter(username=username).exists():
            return render(request, 'users/register.html', {'error': 'Username already exists'})
        if MyUser.objects.filter(email=email).exists():
            return render(request, 'users/register.html', {'error': 'Email already exists'})
        if MyUser.objects.filter(phone=phone).exists():
            return render(request, 'users/register.html', {'error': 'Phone number already exists'})
        # Create the ClientProfile object
        client_profile = MyUser(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            phone=phone,
            date_of_birth=dob,
            address=address,
            is_owner=False
        )
        client_profile.set_password(password)
        client_profile.save()
        return render(request, 'users/register.html', {'success': 'Registration successful'})

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
            return render(request, 'users/owners/register.html', {'error': 'Passwords do not match'})
        image = request.FILES.get('image')
        address = request.POST.get('address')

        
        if MyUser.objects.filter(username=username).exists():
            return render(request, 'users/owners/register.html', {'error': 'Username already exists'})
        if MyUser.objects.filter(email=email).exists():
            return render(request, 'users/owners/register.html', {'error': 'Email already exists'})
        if MyUser.objects.filter(phone=phone).exists():
            return render(request, 'users/owners/register.html', {'error': 'Phone number already exists'})
        if aadhar_no and MyUser.objects.filter(aadhar_card=aadhar_no).exists():
            return render(request, 'users/owners/register.html', {'error': 'Aadhar number already exists'})
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
            address=address,
            is_owner=True
        )
        owner_profile.set_password(password)
        owner_profile.save()
        # return render(request, 'users/owners/register.html', {'success': 'Registration successful'})
        return redirect('user_login')
        return HttpResponse("Registration successful.")
    
    return render(request, 'users/owners/register.html')



def user_logout(request):
    logout(request)
    return HttpResponse("Logged out successfully.")