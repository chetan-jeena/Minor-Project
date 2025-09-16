from django.contrib import admin
from .models import PgListing, PGImage
# Register your models here.
class PgListingAdmin(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "owner":
            kwargs["queryset"] = db_field.related_model.objects.filter(is_owner=True)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


admin.site.register(PgListing,PgListingAdmin)
admin.site.register(PGImage)
