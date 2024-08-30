interface Props {
    onShareScreen: any;
}

const ShareScreenButton : React.FC<Props> = ({ onShareScreen }) => (
    <button className="bg-red-500" onClick={onShareScreen}>
      shareScreen
    </button>
  );
  
  export default ShareScreenButton;