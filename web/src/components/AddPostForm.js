import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addNewPost } from '../actions/post.actions';
import { setAlert } from '../actions/alert.actions';
import Alert from './Alert';
import Spinner from './Spinner';

const AddPostForm = ({ deFaultFilter }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const addPostLoading = useSelector(state => state.posts.addPostLoading);

    const [postFilter, setPostFilter] = useState(deFaultFilter);
    const [postContent, setPostContent] = useState('');
    const [imagesData, setImagesData] = useState([]);
    const [previews, setPreviews] = useState([]);

    const onFilterChange = event => {
        setPostFilter(event.target.value)
    };

    const onPostContentChange = event => {
        setPostContent(event.target.value)
    };

    const onImageChange = event => {
        if (checkMimeType(event)) {
            setImagesData([...imagesData, ...event.target.files]);
            let files = Array.from(event.target.files);
            files.forEach((file) => {
                let reader = new FileReader();
                reader.onloadend = () => {
                    setPreviews(previousState => ([...previousState, reader.result]))
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const renderThumbnails = () =>
        previews && previews.map((url) => (
            <img key={url} alt="preview image" src={url} className="avatar-lg mb-3 rounded mr-2" />
        ));

    const checkMimeType = event => {
        let files = event.target.files;
        let message = '';
        const types = ['image/png', 'image/jpeg'];

        for ( let i = 0; i < files.length; i++ ) {
            if (types.every(type => files[i].type !== type)) {
                message += 'Ce type de fichier n\'est pas pris en charge. seuls jpg et png sont autorisés.';
            }
        }

        if (message !== '') {
            dispatch(setAlert(message, 'secondary'));
            event.target.value = null;
            return false;
        }
        return true;
    };

    const removeAll = () => {
        setImagesData([]);
        setPreviews([]);
    };

    const onSubmit = event => {
        event.preventDefault();

        if (postContent.length === 0) return;
        const data = new FormData();
        data.append('user_id', user.id);
        data.append('filter', postFilter);
        data.append('content', postContent);
        for (const image of imagesData) {
            data.append('file', image)
        }

        dispatch(addNewPost(data));

        setPostContent('');
        setPostFilter(deFaultFilter);
        setImagesData( []);
        setPreviews( []);
    };

    return (
        <div className="chat-content-wrap" data-sidebar-content="chat">
            <Alert/>
            <div className="d-flex pl-3 pr-3 pt-2 pb-2 o-hidden box-shadow-1 chat-topbar">
                <div className="d-flex align-items-center">
                    <p className="m-0 text-title text-16 flex-grow-1">Créer une publication</p>
                </div>
            </div>
            <div className="pl-3 pr-3 pt-3 pb-3 box-shadow-1 chat-input-area">

                <div className="mt-2">
                    { previews && (renderThumbnails())}

                    { previews.length > 0 &&
                        <div className="text-danger mb-2"
                             style={{cursor: 'pointer'}}
                             onClick={() => removeAll()}>
                            <i className="nav-icon i-Close-Window font-weight-bold"></i>
                            {' '}Annuler
                        </div>
                    }
                </div>

                <form className="inputForm" onSubmit={event => onSubmit(event)}>
                    <div className="form-group">
                        <textarea
                            className="form-control form-control-rounded"
                            id="content" name="content"
                            placeholder={ 'Que voulez-vous dire, ' + user.username + ' ?'}
                            cols="30" rows="3"
                            value={postContent}
                            onChange={onPostContentChange}
                        />
                    </div>
                    <div className="d-flex">
                    { location.pathname === '/forum' &&
                        <div className="form-group">
                            <div className="input-group input-group-sm">
                                <div className="input-group-prepend">
                                    <span className="input-group-text i-Tag-3" id="basic-addon1"></span>
                                </div>
                                    <select onChange={onFilterChange} id="filter" className="form-control">
                                        <option value="general">Général</option>
                                        <option value="witness">Témoignage</option>
                                        <option value="protocol">Protocole</option>
                                    </select>
                            </div>
                        </div>
                    }

                        <div className="flex-grow-1"></div>

                        <button className="btn btn-icon btn-rounded btn-outline-primary btn-file mr-2"
                                type="button" style={{ position: 'relative', overflow: 'hidden' }} >
                            <i className="i-Add-File"></i>
                            <input
                                id="image" type="file" multiple
                                accept="image/png, image/jpeg"
                                onChange={onImageChange}
                                style={{ position: 'absolute', fontSize: '50px', opacity: '0', right: '0', top: '0'}}
                            />
                        </button>

                        { addPostLoading ?
                            <Spinner/>
                            :
                            <button className="btn btn-icon btn-rounded btn-primary" type="submit">
                                <i className="i-Paper-Plane"></i>
                            </button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AddPostForm;