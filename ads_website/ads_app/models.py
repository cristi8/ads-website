from django.db import models


class AdCategory(models.Model):
    name = models.CharField(max_length=200)
    
    def ad_count(self):
        return self.ad_set.count()

    def __unicode__(self):
        return self.name

class Ad(models.Model):
    title = models.CharField(max_length=200)
    message = models.CharField(max_length=2000)
    category = models.ForeignKey(AdCategory)
    pub_date = models.DateTimeField('date published')

    def __unicode__(self):
        return self.title


