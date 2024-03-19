import { nanoid } from 'nanoid';

import { useEffect, useState } from 'react';
import { fetchImages } from '../servises/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const App = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [button, setButton] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [perPage, setPerPage] = useState(12);

  useEffect(() => {
    if (value) {
      setIsLoading(true);
      fetchImages(value, page, perPage)
        .then(data => {
          if (data.hits.length > 0) {
            const hits = data.hits.map(image => ({
              id: nanoid(),
              webformatURL: image.webformatURL,
              largeImageURL: image.largeImageURL,
            }));

            setHits(prevHits => [...prevHits, ...hits]);
            setTotalPages(Math.ceil(data.totalHits / perPage));
            setButton(hits.length >= 12 ? true : false);
          }
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [page, perPage, value]);

  const onSubmit = value => {
    setValue(value);
    setPage(1);
    setHits([]);
  };

  const handleButtonClick = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    } else {
      setButton(false);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = imageId => {
    setModalImage(hits.find(image => image.id === imageId));
    toggleModal();
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <div>Loading...</div>}
      <ImageGallery hits={hits} openModal={openModal} />
      {button && <Button onClick={handleButtonClick} />}
      {showModal && <Modal toggleModal={toggleModal} modalImage={modalImage} />}
    </div>
  );
};

export default App;

// class App extends Component {
//   state = {
//     value: '',
//     page: 1,
//     hits: [],
//     isLoading: false,
//     totalPages: 0,
//     perPage: 12,
//     button: false,
//     showModal: false,
//     modalIMG: '',
//   };

//   getData = () => {
//     const { value, page, perPage } = this.state;
//     fetchImages(value, page, perPage)
//       .then(data => {
//         if (data.hits.length > 0) {
//           const hits = data.hits.map(image => ({
//             id: nanoid(),
//             webformatURL: image.webformatURL,
//             largeImageURL: image.largeImageURL,
//           }));

//           this.setState(prevState => ({
//             hits: [...prevState.hits, ...hits],
//             totalPages: Math.ceil(data.totalHits / perPage),
//             button: hits.length >= 12 ? true : false,
//           }));
//         }
//       })
//       .catch(error => console.error('Error fetching data:', error))
//       .finally(() => {
//         this.setState({ isLoading: false });
//       });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { value, page } = this.state;
//     if (prevState.value !== value || prevState.page !== page) {
//       this.setState({ isLoading: true });
//       this.getData();
//       console.log(this.state.modalIMG);
//     }
//   }

//   onSubmit = value => {
//     this.setState({ value, page: 1, hits: [] });
//   };

//   handleButtonClick = () => {
//     const { page, totalPages } = this.state;
//     if (page < totalPages) {
//       this.setState(prevState => ({ page: prevState.page + 1 }));
//     } else {
//       this.setState({ button: false });
//     }
//   };

//   showModal = id => {
//     const modalIMG = this.state.hits.find(image => image.id === id);
//     this.setState({ modalIMG });
//     this.toggleModal();
//   };

//   toggleModal = () => {
//     this.setState({ showModal: !this.state.showModal });
//   };

//   render() {
//     const { isLoading, button, hits, showModal } = this.state;
//     return (
//       <div>
//         <Searchbar onSubmit={this.onSubmit} />
//         {isLoading && <div>Loading...</div>}
//         <ImageGallery hits={hits} showModal={this.showModal} />
//         {button && <Button onClick={this.handleButtonClick} />}
//         {showModal && (
//           <Modal
//             toggleModal={this.toggleModal}
//             modalIMG={this.state.modalIMG}
//           />
//         )}
//       </div>
//     );
//   }
// }

// export default App;
