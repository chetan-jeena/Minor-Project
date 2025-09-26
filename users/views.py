from django.shortcuts import render,redirect
from .models import MyUser
from django.contrib.auth import logout
from django.http import HttpResponse
from django.contrib import messages, auth
#varification email
from django.contrib.sites.shortcuts import get_current_site 
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
# Create your views here.
from pgs.models import PgListing

def user_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = auth.authenticate(email=email, password=password)
        if user is not None:
            auth.login(request, user)
            if user.is_owner:
                if not PgListing.objects.filter(owner=user).exists():
                    return redirect('pg_register')
                return HttpResponse('owner_dashboard ')
            else:
                return HttpResponse('client_dashboard')
        else:
            messages.error(request, 'Invalid login credentials')
            return redirect('user_login')
    return render(request, 'users/login.html')


def client_register(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username = request.POST.get('username')
        email = request.POST.get('email')
        gender = request.POST.get('gender')
        phone = request.POST.get('phone')
        dob = request.POST.get('dob')
        password = request.POST.get('create_password')
        confirm_password = request.POST.get('confirm_password')
        if password != confirm_password:
            messages.error(request, 'Passwords do not match')
            return render(request, 'users/clients/client_register.html')
        address = request.POST.get('address')

        
        if MyUser.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists')
            return render(request, 'users/clients/client_register.html')
        if MyUser.objects.filter(email=email).exists():
            messages.error(request, 'Email already exists')
            return render(request, 'users/clients/client_register.html')
        if MyUser.objects.filter(phone=phone).exists():
            messages.error(request, 'Phone number already exists')
            return render(request, 'users/clients/client_register.html')
        # Create the ClientProfile object
        client_profile = MyUser(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            gender=gender,
            phone=phone,
            date_of_birth=dob,
            address=address,
            is_owner=False
        )
        client_profile.set_password(password)
        client_profile.save()
        current_site = get_current_site(request)
        mail_subject = 'Please activate your account'
        message = render_to_string('users/account_varification_email.html',{
            'user': client_profile,
            'domain': current_site,
            'uid': urlsafe_base64_encode(force_bytes(client_profile.pk)),
            'token': default_token_generator.make_token(client_profile),
        })
        to_email = email
        send_email = EmailMessage(mail_subject,message,to=[to_email])
        try:
            send_email.send()
        except Exception as e:
            messages.error(request, f'Error sending verification email: {str(e)}')
            return redirect('client_register')
        messages.success(request,'Thank you for registring with us. We have sent you a verification email to your email address. Please verify it.')
        return redirect('/user/login/?command=verification&email='+email)

    return render(request, 'users/clients/client_register.html')


def owner_register(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username = request.POST.get('username')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        gender = request.POST.get('gender')
        dob = request.POST.get('dob')
        aadhar_no = request.POST.get('aadhar')
        password = request.POST.get('create_password')
        confirm_password = request.POST.get('confirm_password')
        if password != confirm_password:
            return render(request, 'users/owners/register.html', {'error': 'Passwords do not match'})
        image = request.FILES.get('image')
        address = request.POST.get('address')

        
        if MyUser.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists')
            return render(request, 'users/owners/register.html')
        if MyUser.objects.filter(email=email).exists():
            messages.error(request, 'Email already exists')
            return render(request, 'users/owners/register.html')
        if MyUser.objects.filter(phone=phone).exists():
            messages.error(request, 'Phone number already exists')
            return render(request, 'users/owners/register.html')
        if aadhar_no and MyUser.objects.filter(aadhar_card=aadhar_no).exists():
            messages.error(request, 'Aadhar number already exists')
            return render(request, 'users/owners/register.html')
        # Create the OwnerProfile object
        owner_profile = MyUser(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            phone=phone,
            date_of_birth=dob,
            gender=gender,
            aadhar_card=aadhar_no,
            
            profile_image=image,
            address=address,
            is_owner=True
        )
        owner_profile.set_password(password)
        owner_profile.save()
        current_site = get_current_site(request)
        mail_subject = 'Please activate your account'
        message = render_to_string('users/account_varification_email.html',{
            'user': owner_profile,
            'domain': current_site,
            'uid': urlsafe_base64_encode(force_bytes(owner_profile.pk)),
            'token': default_token_generator.make_token(owner_profile),
        })
        to_email = email
        send_email = EmailMessage(mail_subject,message,to=[to_email])
        send_email.send()

        # messages.success(request,'Thank you for registring with us. We have sent you a verification email to your email address. Please verify it.')
        return redirect('/user/login/?command=verification&email='+email)

    return render(request, 'users/owners/register.html')


def activate(request,uidb64,token):
    
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = MyUser._default_manager.get(pk=uid)
    except(TypeError,ValueError,OverflowError,MyUser.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user,token):
        user.is_active = True
        user.save()
        messages.success(request, 'Congratulations! Your account is activate.')
        return redirect('user_login')
    else:
        messages.error(request, 'Invalid activate link')
        if user is not None and user.is_owner:
            return redirect('owner_register')
        else:
            return redirect('client_register')
    

def signup(request):
    return render(request, 'users/signup.html')

def user_logout(request):
    logout(request)
    return redirect('home')


def forgotPassword(request):
    if request.method =='POST':
        email = request.POST['email']
        if MyUser.objects.filter(email=email).exists():
            user = MyUser.objects.get(email__exact=email)
            #reset password email
            current_site = get_current_site(request)
            mail_subject = 'Reset Your Password'
            message = render_to_string('users/reset_password_email.html',{
                'user': user,
                'domain': current_site,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': default_token_generator.make_token(user),
            })
            to_email = email
            send_email = EmailMessage(mail_subject,message,to=[to_email])
            send_email.send()
            messages.success(request, 'Password reset email has been sent to your email address.')
            return redirect('user_login')
        
        else:
            messages.error(request, 'Account does not exist!')
            return redirect('forgotPassword')
    return render(request, 'users/forgotPassword.html')


def resetpassword_validate(request,uidb64,token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = MyUser._default_manager.get(pk=uid)
    except(TypeError,ValueError,OverflowError,MyUser.DoesNotExist):
        user = None
    
    if user is not None and default_token_generator.check_token(user,token): 
        request.session['uid'] = uid
        request.session['email'] = user.email
        messages.success(request, 'Please reset your password')
        return redirect('resetPassword')
    else:
        messages.error(request, 'This link has been expired!')
        return redirect('user_login')
    
def resetPassword(request):
    if request.method == 'POST':
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']

        if password == confirm_password:
            uid = request.session.get('uid')
            user = MyUser.objects.get(pk=uid)
            user.set_password(password)
            user.save()
            messages.success(request, 'Password reset successful')
            return redirect('user_login')

        else:
            messages.error(request, 'Password do not match!')
            return redirect('resetPassword')
    else:
        email = request.session.get('email')
        return render(request, 'users/resetPassword.html', {'email': email})