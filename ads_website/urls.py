from django.conf.urls.defaults import *
from django.conf import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'ads_website.ads_app.views.index'),
    url(r'^details/(\d*)$', 'ads_website.ads_app.views.ad_details'),
    url(r'^category/(\d*)$', 'ads_website.ads_app.views.category_details'),
    
    url(r'^publish$', 'ads_website.ads_app.views.publish'),
    url(r'^post-ad$', 'ads_website.ads_app.views.post_ad'),
    
    url(r'^search$', 'ads_website.ads_app.views.search'),
    url(r'^about$', 'ads_website.ads_app.views.about'),
    
    # Example:
    # (r'^ads_website/', include('ads_website.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),
)


if settings.DEBUG:
    urlpatterns += patterns('',
        (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_FILES_PATH}),
    )

