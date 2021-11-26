import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import {
  Container, BannerImage,
} from './styles';

export default function SingleBanner({bannerUrl,nav}) {
  return (
    <Container>
      <BannerImage source={{ uri: bannerUrl }} />
    </Container>
  );
}

SingleBanner.propTypes = {
  bannerUrl: PropTypes.string.isRequired,
};
