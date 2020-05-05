import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import '../assets/scss/custom/print.scss';

class ComponentToPrint extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          file: props.file,
      };
  }

  render() {

    return (
      <div>
        <h1 className="mb-4">{this.state.file.title}</h1>
        <div className="content-body" dangerouslySetInnerHTML={{ __html: this.state.file.content }} />
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