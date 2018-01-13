import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Avatar = ({ index, selectAvatar, src, selectedAvatarIndex }) => {
  function handleAvatarClick() {
    selectAvatar(index);
  }

  return (
    <div className={selectedAvatarIndex === index ? "selectedAvatar" : "avatar"}>
      <Image
        src={src}
        rounded
        size='mini'
        onClick={handleAvatarClick}
      />
    </div>
  );
};

Avatar.propTypes = {
  index: PropTypes.number.isRequired,
  selectAvatar: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  selectedAvatarIndex: PropTypes.number.isRequired // eslint-disable-line 
}

export default Avatar;