import unittest
from conversation import Conversation
import os
from datetime import datetime

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
        self.assertEqual(convo.name, "andrewzhang")
        self.assertEqual(len(convo.members), 1)
        self.assertTrue("Andrew Zhang" in convo.members)
        self.assertEqual(len(convo.messages), 3)


    def test_same_directory_parse(self):
        os.chdir("./mock_data")
        c1 = Conversation(TestConversation.conv)
        self.assert_props(c1)
        c2 = Conversation(TestConversation.conv+"/")
        self.assert_props(c2)


    def test_between_begin_and_end_dates(self):
        dt1 = TestConversation.c1.start_date
        dt2 = TestConversation.c1.end_date
        msgs = TestConversation.c1.between_dates(dt1, dt2)
        self.assertEqual(len(msgs), 2) # exclusive end


    def test_between_everything(self):
        dt1 = TestConversation.c1.start_date
        dt2 = datetime.fromtimestamp(TestConversation.c1.end_date.timestamp() + 100)
        msgs = TestConversation.c1.between_dates(dt1, dt2)
        self.assertEqual(len(msgs), 3) # exclusive end


    def test_between_some_dates(self):
        dt1 = datetime.fromtimestamp(0)
        dt2 = datetime.fromtimestamp(1488949842021/1000.0 + 100) # 1488949842021 is ts of 2nd message
        msgs = TestConversation.c1.between_dates(dt1, dt2)
        self.assertEqual(len(msgs), 2)


    def test_between_some_dates_edge_case(self):
        dt1 = datetime.fromtimestamp(0)
        dt2 = datetime.fromtimestamp(1488949842021/1000.0) # 1488949842021 is ts of 2nd message
        msgs = TestConversation.c2.between_dates(dt1, dt2) # exclusive end
        self.assertEqual(len(msgs), 1)



if __name__ == '__main__':
    unittest.main()
