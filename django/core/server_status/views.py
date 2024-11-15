from django.http import JsonResponse

def responseView(request):
    return JsonResponse({
        'status': 200,
        'codeToMatch': '018352'
    })
