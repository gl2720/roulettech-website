from django.db import models

# Create your models here.
class ListItem(models.Model):
    title = models.CharField(max_length=100)
    amount = models.IntegerField(default = 1)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title