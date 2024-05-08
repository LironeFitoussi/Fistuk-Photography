import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './ImageModal.module.css'; // Import the CSS module
import { IoDownloadOutline, IoReturnUpBack  } from "react-icons/io5";



interface Photo {
    _id: string;
    name: string;
    filename: string;
    collectionId: string;
    __v: number;
    url: string;
}

interface BasicModalProps {
  open: boolean;
  onClose: () => void;
  image: Photo;
  download?: () => void;
}

const ImageModal: React.FC<BasicModalProps> = ({ open, onClose, image, download }) => {
    const buttonStyle = {
        color: 'black',
        backgroundColor: 'white',
        // borderRadius: '50%',
        // padding: '10px',
        fontSize: '20px',
        margin: '10px'
    }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{ style: { backdropFilter: 'blur(8px)', backgroundColor: '#25252580' } }} // Directly style the backdrop
    >
      <Box className={styles.modal}>  {/* Use className instead of sx */}
        <div className={styles.actions}>
            <Button onClick={onClose} sx={buttonStyle}>
                <IoReturnUpBack  />
                {/* <a href={image.url} download='new-image'>downoad</a> */}
            </Button>
            <Button onClick={download} sx={buttonStyle}>  
                <IoDownloadOutline />
            </Button>
        </div>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} className={styles.textWrap}>
          Name: {image.name}
        </Typography>
        <img src={image.url} alt={image.name} className={styles.image} /> {/* Adding an alt tag */}
        <Typography sx={{ mt: 1 }} className={styles.textWrap}>
          Message: {image.filename}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ImageModal;
