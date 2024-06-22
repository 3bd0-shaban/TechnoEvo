import { FC } from 'react';

interface LiveKoraProps {}

const LiveKora: FC<LiveKoraProps> = ({}) => {
  return (
    <iframe
      //   allowfullscreen=""
      //   frameborder="0"
      height="500"
      //   mozallowfullscreen=""
      name="search_iframe"
      src="https://kkkk.alkoora.live/albaplayer/on-time-sport-1/"
      //   webkitallowfullscreen=""
      width="100%"
    ></iframe>
  );
};

export default LiveKora;
