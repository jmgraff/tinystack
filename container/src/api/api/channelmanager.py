from django.http import HttpResponse

from django_eventstream.channelmanager import DefaultChannelManager


class ChannelManager(DefaultChannelManager):
    def can_read_channel(self, user, channel):
        if user is None:
            return False
        return True
