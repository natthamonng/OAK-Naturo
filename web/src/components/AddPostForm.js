import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addNewPost } from '../actions/post.actions';
import { setAlert } from '../actions/alert.actions';
import Alert from './Alert';
import Spinner from './Spinner';

const AddPostForm = ({ setAlert, addNewPost, user, deFaultFilter, addPostLoading }) => {
    const location = useLocation();
    const userId = user.id;
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

    let thumbnails =  previews.map(url => {
        return <img key={url} alt="preview image" src={url} className="avatar-lg mb-3 rounded mr-2" />
    });

    const checkMimeType = event =>{
        let files = event.target.files;
        let message = '';
        const types = ['image/png', 'image/jpeg'];

        for ( let i = 0; i < files.length; i++ ) {
            if (types.every(type => files[i].type !== type)) {
                message += 'Ce type de fichier n\'est pas pris en charge. seuls jpg et png sont autorisés.';
            }
        }

        if (message !== '') {
            setAlert(message, 'secondary');
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

        if (postContent === '' || imagesData === [] ) return;
        const data = new FormData();
        data.append('user_id', userId);
        data.append('filter', postFilter);
        data.append('content', postContent);
        for (const image of imagesData) {
            data.append('file', image)
        }

        addNewPost(data);

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
                { thumbnails.length > 0 &&
                    <div className="mt-2">
                        { thumbnails }

                        { thumbnails.length > 0 &&
                        <div className="text-danger mb-2"
                             style={{cursor: 'pointer'}}
                             onClick={() => removeAll()}>
                            <i className="nav-icon i-Close-Window font-weight-bold"></i>
                            {' '}Annuler
                        </div>
                        }
                    </div>
                }
                <form className="inputForm" onSubmit={event => onSubmit(event)}>
                    <div className="form-group">
                        <textarea
                            className="form-control form-control-rounded"
                            id="content" name="content"
                            placeholder={ 'Que voulez-vous dire, ' + user.username + ' ?'}
                            cols="30" rows="3"
                            value={postContent}
                            onChange={event=> onPostContentChange(event)}
                        />
                    </div>
                    <div className="d-flex">
                    { location.pathname === '/home' &&
                        <div className="form-group">
                            <div className="input-group input-group-sm">
                                <div className="input-group-prepend">
                                    <span className="input-group-text i-Tag-3" id="basic-addon1"></span>
                                </div>
                                    <select onChange={event => onFilterChange(event)} id="filter" className="form-control">
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
                                onChange={event => onImageChange(event)}
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

const mapStateToProps = state => ({
    user: state.auth.user,
    addPostLoading: state.posts.addPostLoading
});

export default connect( mapStateToProps, { setAlert, addNewPost })(AddPostForm);