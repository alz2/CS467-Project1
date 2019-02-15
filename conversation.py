import os
import json
from datetime import datetime

class Conversation(object):

    def __init__(self, dir_path):
        if not os.path.isdir(dir_path):
            raise ValueError(f"Can't find {dir_path}! directory")

        if dir_path[-1] != "/":
            dir_path += "/"

        self.__conversation_name = self.__conversation_name_from_path(dir_path)
        start_date, end_date, members, messages = self.__load_msgs(dir_path)
        self.__start_date = start_date
        self.__end_date = end_date
        self.__members = members
        self.__messages = messages


    @property
    def messages(self):
        return self.__messages


    @property
    def start_date(self):
        return self.__start_date


    @property
    def end_date(self):
        return self.__end_date


    @property
    def members(self):
        return self.__members


    @property
    def members(self):
        return self.__members


    @property
    def conversation_name(self):
        return self.__conversation_name


    """
    Helper Methods
    """

    def __load_msgs(self, dir_name):
        if "/" in dir_name:
            msg_file = f"{dir_name}message.json"
        else:
            msg_file = f"{dir_name}/message.json"

        with open(msg_file, 'r') as inf:
            d = json.load(inf)
        
        if "participants" in d:
            members = set([p["name"] for p in d["participants"]])
        else:
            members = None

        if "messages" not in d:
            raise ValueError("messages tag not found in JSON...")
        
        messages = d["messages"]
        for m in messages: # make dt objs
            m["timestamp"] = datetime.fromtimestamp(m["timestamp_ms"]/1000.0)
            del m["timestamp_ms"]

        start_date = messages[-1]["timestamp"]
        end_date = messages[0]["timestamp"]
        return start_date, end_date, members, messages 


    def __conversation_name_from_path(self, dir_path):
        try:
            if dir_path[-1] == "/": # remove last slash if present
                dir_path = dir_path[:-1]

            ldi = dir_path.rfind("/")+1
            return dir_path[ldi:dir_path.index("_", ldi)]
        except:
            return dir_path


