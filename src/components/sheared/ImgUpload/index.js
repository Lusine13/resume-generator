import { Upload, Progress } from 'antd';
import { useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const ImgUpload = ({ progress, uploading, handleUpload }) => {
    const { userData: { imgUrl, uid }} = useSelector(store => store.userProfile.authUserInfo);
           
    const uploadButton = ( 
        <button style={{ border: 0, background: 'none' }} type="button">
            {uploading ? <Progress type="circle" size={80} percent={progress}/> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );    

    return (
        <div>
          <Upload
          fileList={[
            {
                uid: uid,              
                status: `done`,
                url: imgUrl,
            },
          ]}
        customRequest={handleUpload}        
        listType="picture-card"
        >
           {uploadButton}
         </Upload>        
        </div> 
    )
};
ImgUpload.propTypes = {
    process: PropTypes.number.isRequired,
    aploading: PropTypes.bool.isRequired,
    handleUpload: PropTypes.func.isRequired,
    
}


export default ImgUpload;