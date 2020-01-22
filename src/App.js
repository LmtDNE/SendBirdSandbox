import React, { useEffect } from 'react';
import logo from './logo.svg';
import SendBird from 'sendbird';
import './App.css';

const sb = new SendBird({ appId: '' });
const App = () => {
  useEffect(() => {
    //connects to SendBird
    sb.connect('sandbox_user_1', '', (user, error) => {
      console.log('What is user', user, 'this is error', error);
    });
    var userIds = ['sandbox_user_2'];

    const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
    channelListQuery.includeEmpty = true;
    channelListQuery.order = 'latest_last_message';

    //gets list of channels
    if (channelListQuery.hasNext) {
      channelListQuery.next(function(channelList, error) {
        if (error) {
          return;
        }

        console.log('What is channelList', channelList);
      });
    }

    sb.GroupChannel.getChannel(
      'sendbird_group_channel_191121503_878b01c6f16060d0ec57aef7a0159d9efce0423f',
      function(groupChannel, error) {
        if (error) {
          console.log('What is error', error);
        }

        console.log('This is groupChannel', groupChannel);

        groupChannel.inviteWithUserIds(userIds, function(response, error) {
          if (error) {
            return;
          }
          console.log('What is response', response);
        });

        const params = new sb.UserMessageParams();

        params.message = 'Test test test';
        params.mentionType = 'users'; // Either 'users' or 'channel'
        params.pushNotificationDeliveryOption = 'default';

        groupChannel.sendUserMessage(params, function(message, error) {
          if (error) {
            console.log('This is error', error);
            return;
          }

          console.log('This is message', message);
        });

        // TODO: Implement what is needed with the contents of the response in the groupChannel parameter.
      }
    );
  });

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          <h2>SendBird Sandbox</h2>
        </p>
      </header>
      <div className='Todo-App'>We in here</div>
    </div>
  );
};

export default App;
