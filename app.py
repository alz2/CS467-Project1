from flask import Flask, jsonify
from typing import Tuple
from flask import Flask, jsonify, request, Response
import sys

from conversation import Conversation

app = Flask(__name__)
inbox = []

"""
Vis Json format 

- {Conversation Name}
    - "name":{Conversation Name}
    - "messages": 
        - {{metric}: val,...}
"""

def create_response(
        data: dict = None, status: int = 200, message: str = ""
        ) -> Tuple[Response, int]:
    """Wraps response in a consistent format throughout the API.

    Format inspired by https://medium.com/@shazow/how-i-design-json-api-responses-71900f00f2db
    Modifications included:
    - make success a boolean since there's only 2 values
    - make message a single string since we will only use one message per response
    IMPORTANT: data must be a dictionary where:
    - the key is the name of the type of data
    - the value is the data itself

    :param data <str> optional data
    :param status <int> optional status code, defaults to 200
    :param message <str> optional message
    :returns tuple of Flask Response and int, which is what flask expects for a response
    """
    if type(data) is not dict and data is not None:
        raise TypeError("Data should be a dictionary 😞")

    response = {
            "code": status,
            "success": 200 <= status < 300,
            "message": message,
            "result": data,
            }
    return jsonify(response), status


def message_metrics(msgs):
    #TODO: list of {"metric1": val, "metric2", val} for each msg
    return msgs


@app.route("/")
def get_vis():
    formatted = {}
    for c in inbox:
        formatted[c.name] = {
                "name":c.name, 
                "messages":message_metrics(c.messages),
                }
    return create_response(formatted)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise ValueError("python3 app.py {inbox_path/}")
    inbox = Conversation.load_inbox(sys.argv[1]) 
    app.run(port=8080, debug=True)
