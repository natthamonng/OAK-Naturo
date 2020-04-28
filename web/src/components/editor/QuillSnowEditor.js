import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../assets/scss/quill-editor.scss';

import axios from 'axios';
import {REMOVE_ALERT} from "../../constants/ActionTypes";
const __ISMSIE__ = !!navigator.userAgent.match(/Trident/i);
const BASE_URL = process.env.REACT_APP_API_URL;

const BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {

    static create(value) {
        const imgTag = super.create();
        imgTag.setAttribute('src', value.src);
        imgTag.setAttribute('alt', value.alt);
        imgTag.setAttribute('width', '100%');
        return imgTag;
    }

    static value(node) {
        return { src: node.getAttribute('src'), alt: node.getAttribute('alt') };
    }
}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot);

class VideoBlot extends BlockEmbed {

    static create(value) {
        if (value && value.src) {
            const videoTag = super.create();
            videoTag.setAttribute('src', value.src);
            videoTag.setAttribute('title', value.title);
            videoTag.setAttribute('width', '100%');
            videoTag.setAttribute('controls', '');

            return videoTag;
        } else {
            const iframeTag = document.createElement('iframe');
            iframeTag.setAttribute('src', value);
            iframeTag.setAttribute('frameborder', '0');
            iframeTag.setAttribute('allowfullscreen', true);
            iframeTag.setAttribute('width', '100%');
            return iframeTag;
        }
    }

    static value(node) {
        if (node.getAttribute('title')) {
            return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
        } else {
            return node.getAttribute('src');
        }
    }
}

VideoBlot.blotName = 'video';
VideoBlot.tagName = 'video';
Quill.register(VideoBlot);

class QuillSnowEditor extends React.Component {

    bandId;
    placeholder;
    onEditorChange;
    _isMounted;

    constructor(props) {
        super(props);
        this.state = {
            defaultValue: props.defaultValue ? props.defaultValue : "",
            editorHtml: __ISMSIE__ ? "<p>&nbsp;</p>" : "",
            files: [],
            error: null
        };

        this.reactQuillRef = null;

        this.inputOpenImageRef = React.createRef();
        this.inputOpenVideoRef = React.createRef();
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = (html) => {
        // console.log('html', html);

        this.setState({
            editorHtml: html
        }, () => {
            this.props.onEditorChange(this.state.editorHtml);
        });
    };

    imageHandler = () => {
        this.inputOpenImageRef.current.click();
    };

    videoHandler = () => {
        this.inputOpenVideoRef.current.click();
    };

    insertImage = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];
            let formData = new FormData();
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };

            formData.append("file", file);

            axios.post(`${BASE_URL}/api/documentation/upload-files`, formData, config)
                .then(response => {
                    if (response.data.success) {

                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();

                        let range = quill.getSelection();
                        let position = range ? range.index : 0;

                        // Upload files to node-server, then use response data in attribute src
                        // Go to the image blot and create the image, take src and alt from the valuation and put it in editorHTML.
                        quill.insertEmbed(position, "image", { src: `${BASE_URL}/${response.data.url}`,
                            alt: response.data.fileName });
                        quill.setSelection(position + 1);

                        if (this._isMounted) {
                            this.setState({
                                files: [...this.state.files, file]
                            }, () => { this.props.onFilesChange(this.state.files) });
                        }
                    }
                })
                .catch(err => {
                    this.setState({error: err.response.data.err});
                    setTimeout(() => this.setState({error: null}), 3000);
                })
        }
    };

    insertVideo = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {

                let files = e.target.files;
                let size = 128; //MB
                let err = "";
                for( let i = 0; i<files.length; i++ ) {
                    if (files[i].size/1024/1024 > size) {
                        err += 'La taille de votre vidéo est trop grande (Maximum 30MB).';
                        this.setState({error: err});
                        setTimeout(() => this.setState({error: null}), 3000);
                        return;
                    }
                }

            const file = e.currentTarget.files[0];

            let formData = new FormData();
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            formData.append("file", file);

            axios.post(`${BASE_URL}/api/documentation/upload-files`, formData, config)
                .then(response => {
                    if (response.data.success) {

                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();

                        let range = quill.getSelection();
                        let position = range ? range.index : 0;
                        quill.insertEmbed(position, "video", { src: `${BASE_URL}/${response.data.url}`,
                            title: response.data.fileName });
                        quill.setSelection(position + 1);

                        if (this._isMounted) {
                            this.setState({
                                files: [...this.state.files, file]
                            }, () => { this.props.onFilesChange(this.state.files) });
                        }
                    }
                })
                .catch(err => {
                    this.setState({error: err.response.data.err});
                    setTimeout(() => this.setState({error: null}), 3000);
                })
        }
    };

    render() {
        return (
            <div>
                <p className="text-danger">{this.state.error}</p>

                <div id="toolbar">
                    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                        <option value="" disabled>Header</option>
                        <option value="1" />
                        <option value="2" />
                        <option value="3" />
                        <option value="4" />
                        <option value="5" />
                        <option value="6" />
                        <option value="" />
                    </select>
                    <select className="ql-size" defaultValue={""} onChange={e => e.persist()}>
                        <option value="" disabled>Size</option>
                        <option value="small" />
                        <option value="large" />
                        <option value="huge" />
                        <option value="" />
                    </select>
                    <select className="ql-color" defaultValue={"black"} onChange={e => e.persist()}>
                        <option value="black" />
                        <option value="purple" />
                        <option value="blue" />
                        <option value="green" />
                        <option value="yellow" />
                        <option value="orange" />
                        <option value="red" />
                    </select>
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                    <button className="ql-script" value={"sub"} />
                    <button className="ql-script" value={"super"} />
                    <button className="ql-code-block" />
                    <button className="ql-blockquote" />
                    <button className="ql-align" value={"center"} />
                    <button className="ql-align" value={"right"} />
                    <button className="ql-list" value={"ordered"} />
                    <button className="ql-list" value={"bullet"} />
                    <button className="ql-indent" value={"-1"} />
                    <button className="ql-indent" value={"+1"} />
                    <button className="ql-insertImage">
                        <i className="i-Landscape font-weight-bold"></i>
                    </button>
                    <button className="ql-insertVideo">
                        <i className="i-Video font-weight-bold"></i>
                    </button>
                    <button className="ql-link" />
                    <button className="ql-video" />

                    <button className="ql-clean" />
                </div>

                <ReactQuill
                    className="editor-edit"
                    ref={(el) => { this.reactQuillRef = el }}
                    theme={'snow'}
                    onChange={this.handleChange}
                    modules={this.modules}
                    formats={this.formats}
                    defaultValue={this.state.defaultValue}
                    // value={this.state.editorHtml}
                    placeholder={this.props.placeholder}
                />

                <input type="file" accept="image/png, image/jpeg" ref={this.inputOpenImageRef} style={{ display: "none" }} onChange={this.insertImage} />
                <input type="file" accept="video/mp4" ref={this.inputOpenVideoRef} style={{ display: "none" }} onChange={this.insertVideo} />
            </div>
        )
    }

    modules = {
        syntax: true,
        toolbar: {
            container: "#toolbar",
            handlers: {
                insertImage: this.imageHandler,
                insertVideo: this.videoHandler
            }
        },
    };

    formats = [
        'header', 'size', 'color',
        'bold', 'italic', 'underline', 'strike', 'script',
        'code-block', 'blockquote',
        'align', 'list', 'bullet', 'indent',
        'image', 'video', 'link', 'video', 'clean'
    ];
}

export default QuillSnowEditor;
