import os
import json
from datetime import datetime
import bisect

class Conversation(object):

    def __init__(self, dir_path):
        if not os.path.isdir(dir_path):
            raise ValueError(f"Can't find {dir_path} directory!")

        dir_path = Conversation.__format_dir_str(dir_path)
        self.__name = self.__name_from_path(dir_path)
        start_date, end_date, members, messages = self.__load_msgs(dir_path)
        self.__start_date = start_date
        self.__end_date = end_date
        self.__members = members
        self.__messages = messages[::-1]
        self.__num_messages = len(messages)
        self.__dates = [m["timestamp"] for m in self.__messages] # just for bisect


    def __repr__(self):
        return f"Convo({self.__num_messages})"


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
    def num_messages(self):
        return self.__num_messages


    @property
    def name(self):
        return self.__name


    def between_dates(self, dt1, dt2):
        lo = bisect.bisect_left(self.__dates, dt1) 
        hi = bisect.bisect_left(self.__dates, dt2, lo=lo)
        return self.messages[lo:hi]


    @staticmethod
    def load_inbox(inbox_path):
        if not os.path.isdir(inbox_path):
            raise ValueError(f"Can't find {inbox_path} directory!")
        dir_base = Conversation.__format_dir_str(inbox_path)
        return [Conversation(f"{dir_base}{dm}") for dm in os.listdir(inbox_path)]

    """
    Helper Methods
    """

    def __load_msgs(self, dir_name):
        dir_name = Conversation.__format_dir_str(dir_name)
        msg_file = f"{dir_name}message.json"

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


    def __name_from_path(self, dir_path):
        try:
            if dir_path[-1] == "/": # remove last slash if present
                dir_path = dir_path[:-1]

            ldi = dir_path.rfind("/")+1
            return dir_path[ldi:dir_path.index("_", ldi)]
        except:
            return dir_path


    @staticmethod
    def __format_dir_str(dstr):
        if dstr[-1] != "/":
            return dstr + "/"
        return dstr


