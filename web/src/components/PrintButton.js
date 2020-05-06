import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import '../assets/scss/custom/print.scss';
import Moment from "react-moment";

class ComponentToPrint extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          file: props.file,
      };
  }

  render() {
    const file = this.state.file;
    return (
      <div>
        <h1 className="mb-4">{file.title}</h1>
        <div className="content-body" dangerouslySetInnerHTML={{ __html: file.content }} />
          <div className="separator-breadcrumb border-top"></div>
          <div className="d-flex align-items-start">
              <div className="ml-2">
                  <p className="m-0 text-title text-16"><strong>Auteur:</strong> {' '}
                      { file.author.username }
                  </p>
                  <div>
                    <span className="text-muted text-small"><strong>Créé:</strong> {' '}
                        <Moment format="DD/MM/YYYY">{ file.createdAt }</Moment>
                    </span>
                      {' '}
                      <span className="text-muted text-small"><strong>Modifié:</strong> {' '}
                          <Moment format="DD/MM/YYYY">{ file.updatedAt }</Moment>
                                                </span>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

const PrintButton = (props) => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button className="btn btn-outline-primary m-1"><i className="i-Download"></i> Imprimer le fichier</button>}
        content={() => componentRef.current}
      />
      <div style={{display: 'none'}}><ComponentToPrint ref={componentRef} file={props.file}/></div>
    </div>
  );
}

export default PrintButton;