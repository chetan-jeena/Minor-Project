from django.shortcuts import render
from .models import PgListing
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required(login_url='user_login')
def pg_detail(request, pg_slug):
    pg = PgListing.objects.get(slug=pg_slug)
    context = {
        'pg': pg ,
    }
    return render(request, 'pgs/pg_detail.html', context)