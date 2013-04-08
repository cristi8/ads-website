from django.template import RequestContext
from django.shortcuts import render_to_response, get_object_or_404, redirect
from django.http import HttpResponse
from ads_app.models import Ad
from ads_app.models import AdCategory

def template_context_processor(request):
    params = { }
    params['client_ip'] = request.META.get('REMOTE_ADDR')
    return params


def about(request):
    return render_to_response('about.html', {}, context_instance=RequestContext(request))

def index(request):
    ad_list = Ad.objects.all()
    category_list = AdCategory.objects.all()
    
    return render_to_response('index.html', { 'ad_list': ad_list, 'category_list': category_list }, context_instance=RequestContext(request))

def ad_details(request, ad_id):
    ad = get_object_or_404(Ad, pk=ad_id)
    return render_to_response('ad_details.html', { 'ad': ad })

def category_details(request, cat_id):
    category = get_object_or_404(AdCategory, pk=cat_id)
    return render_to_response('category.html', { 'category': category }, context_instance=RequestContext(request))


def search(request):
    return render_to_response('search.html', {}, context_instance=RequestContext(request))


def publish(request):
    category_list = AdCategory.objects.all()
    return render_to_response('publish.html', { 'category_list': category_list }, context_instance=RequestContext(request))

def post_ad(request):
    
    return HttpResponse('SUCCESS 1');

