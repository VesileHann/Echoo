import Modal from "./Modal";

const uploadModal =() =>{
    return(
        <Modal
        title="Upload modal title"
        description="Upload modal description"
        isOpen
        onChange={()=>{}}
        >
            Upload Content
        </Modal>
    );
};

export default uploadModal;