from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255)
    path_from_root = models.JSONField()  # Almacena el path_from_root como un JSON
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='children')

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name