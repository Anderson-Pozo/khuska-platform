/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { IconCamera } from '@tabler/icons';

const ConferenceCenter = ({ idConference }) => {
  const domain = 'meet.jit.si';
  let api = {};
  const startMeet = () => {
    const options = {
      roomName: idConference,
      width: '100%',
      height: '100%',
      configOverwrite: {
        prejoinPageEnabled: false
      },
      interfaceConfigOverwrite: {
        SHOW_CHROME_EXTENSION_BANNER: false
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: 'Paul Alvarez'
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    api = new window.JitsiMeetExternalAPI(domain, options);
    api.addEventListeners({
      readyToClose: handleClose,
      participantLeft: handleParticipantLeft,
      participantJoined: handleParticipantJoined,
      videoConferenceJoined: handleVideoConferenceJoined,
      videoConferenceLeft: handleVideoConferenceLeft,
      audioMuteStatusChanged: handleMuteStatus,
      videoMuteStatusChanged: handleVideoStatus
    });
    api.getLivestreamUrl().then((livestreamData) => {
      console.log('URL YOUTUBE', livestreamData);
    });
  };

  const handleClose = () => {
    console.log('handleClose');
  };

  const handleParticipantLeft = async (participant) => {
    console.log('handleParticipantLeft', participant);
    const data = await getParticipants();
    console.log(data);
  };

  const handleParticipantJoined = async (participant) => {
    console.log('handleParticipantJoined', participant);
    const data = await getParticipants();
    console.log(data);
  };

  const handleVideoConferenceJoined = async (participant) => {
    console.log('handleVideoConferenceJoined', participant);
    const data = await getParticipants();
    console.log(
      'LIVE: ',
      api.getLivestreamUrl().then((livestreamData) => {
        livestreamData = {
          livestreamUrl: 'livestreamUrl'
        };
      })
    );
    console.log(data);
  };

  const handleVideoConferenceLeft = () => {
    console.log('handleVideoConferenceLeft');
    console.log('LIVE: ', api.getLivestreamUrl());
  };

  const handleMuteStatus = (audio) => {
    console.log('handleMuteStatus', audio);
  };

  const handleVideoStatus = (video) => {
    console.log('handleVideoStatus', video);
  };

  function getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(api.getParticipantsInfo());
      }, 500);
    });
  }

  return (
    <div
      style={{
        top: '13%',
        left: '20%',
        width: '75%',
        height: '75%',
        position: 'absolute',
        borderRadius: 15,
        padding: 15
      }}
    >
      <div id="jitsi-iframe" style={{ width: '100%', height: '100%', borderRadius: 15 }}></div>
      <span hidden>Conferencia: {idConference}</span>
      <div style={{ left: '35%', top: '100%', width: '30%', height: '8%', background: '#006E47', position: 'absolute' }} id="btnUnirse4">
        <Button fullWidth variant="contained" startIcon={<IconCamera />} size="large" onClick={startMeet}>
          Entrar
        </Button>
      </div>
    </div>
  );
};

ConferenceCenter.propTypes = {
  idConference: PropTypes.string
};

export default ConferenceCenter;
