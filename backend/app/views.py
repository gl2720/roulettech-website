from django.shortcuts import render
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import ListItemSerializer
from .models import ListItem

# Create your views here.
class ListItemViewSet(viewsets.ModelViewSet):
    queryset = ListItem.objects.all().order_by('-created_at')
    serializer_class = ListItemSerializer

    @action(detail=True, methods=['POST'])
    def toggle_complete(self, request, pk=None):
        item = self.get_object()
        item.completed = not item.completed
        item.save()
        serializer = ListItemSerializer(item)
        return Response(serializer.data)
    
    @action(detail=True, methods=['POST'])
    def edit_amount(self, request, pk=None):
        item = self.get_object()
        edit = request.data['edit']
        if edit == 'inc':
            item.amount += 1
        elif edit == 'dec' and item.amount > 0:
            item.amount -= 1
        else :
            return Response({'error': 'Invalid edit type'})
        item.save()
        serializer = ListItemSerializer(item)
        return Response(serializer.data)
    
    # def create(self, request):
    #     serializer = ListItemSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=201)
    #     return Response(serializer.errors, status=400)
    
    # def destroy(self, request, pk=None):
    #     item = ListItem.objects.get(id=pk)
    #     item.delete()
    #     return Response(status=204)


@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, chef!'})