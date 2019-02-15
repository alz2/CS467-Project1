import unittest
from conversation import Conversation
import os

class TestConversation(unittest.TestCase):
    conv = "andrewzhang_dmtp_6erjw"
    c1_dir_path = f"./mock_data/{conv}/" # with backslash
    c2_dir_path = f"./mock_data/{conv}" # without backslash
    c1 = Conversation(c1_dir_path)
    c2 = Conversation(c2_dir_path)
    

    def test_parse_conversation_1(self):
        self.assert_props(TestConversation.c1)


    def test_parse_conversation_2(self):
        self.assert_props(TestConversation.c2)


    def assert_props(self, convo):
        self.assertEqual(convo.conversation_name, "andrewzhang")
        self.assertEqual(len(convo.members), 1)
        self.assertTrue("Andrew Zhang" in convo.members)
        self.assertEqual(len(convo.messages), 3)


    def test_same_directory_parse(self):
        os.chdir("./mock_data")
        c1 = Conversation(TestConversation.conv)
        self.assert_props(c1)
        c2 = Conversation(TestConversation.conv+"/")
        self.assert_props(c2)



if __name__ == '__main__':
    unittest.main()
