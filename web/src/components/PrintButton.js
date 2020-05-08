import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import '../assets/scss/custom/print.scss';
import Moment from 'react-moment';

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

          <div className="d-flex align-items-start flex-column mb-2 ml-4">
              <small className="text-muted text-16 font-weight-bold">Auteur: {' '}
                  { file.author.username }
              </small>
              <div>
                  <small className="text-muted text-small font-weight-bold">Créé: {' '}
                      <Moment format="DD MMMM YYYY">{ file.createdAt }</Moment>
                  </small>
                  {' '}
                  <small className="text-muted text-small font-weight-bold">Modifié: {' '}
                      <Moment format="DD MMMM YYYY">{ file.updatedAt }</Moment>
                  </small>
              </div>
          </div>
          <div className="separator-breadcrumb border-top"></div>

          <div className="content-body" dangerouslySetInnerHTML={{ __html: file.content }} />

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