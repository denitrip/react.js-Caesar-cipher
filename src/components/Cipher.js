import React from 'react';
import {TextArea} from 'semantic-ui-react'
import Button from 'react-bootstrap/Button';

class Cipher extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sourceText: '',
      key: '',
      result: '',
      disabledButtons: true
    };

    this.changeText = this.changeText.bind(this);
    this.changeKey = this.changeKey.bind(this);
    this.codeText = this.codeText.bind(this);
    this.decodeText = this.decodeText.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  changeText(event) {
    this.setState({sourceText: event.target.value}, this.validateFields)
  }

  changeKey(event) {
    this.setState({key: event.target.value}, this.validateFields)
  }

  codeText() {
    let result = this.state.sourceText.split('').map(e => {
      const code = e.charCodeAt(0)
      let step = this.state.key % 33;
      if (code >= 1040 && code <= 1071) {
        return (code + step) > 1071 ? String.fromCharCode(1039 + (step - (1071 - code))) : String.fromCharCode(code + step)
      } else if (code >= 1072 && code <= 1103) {
        return (code + step) > 1103 ? String.fromCharCode(1071 + (step - (1103 - code))) : String.fromCharCode(code + step)
      } else {
        return e;
      }
    }).join('');
    this.setState({result: result});
  }

  decodeText() {
    let result = this.state.sourceText.split('').map(e => {
      const code = e.charCodeAt(0);
      let step = this.state.key % 33;
      if (code >= 1040 && code <= 1071) {
        return (code - step) < 1040 ? String.fromCharCode(1072 - (step - (code - 1040))) : String.fromCharCode(code - step)
      } else if (code >= 1072 && code <= 1103) {
        return (code - step) < 1072 ? String.fromCharCode(1104 - (step - (code - 1072))) : String.fromCharCode(code - step)
      } else {
        return e;
      }
    }).join('');
    this.setState({result: result});
  }

  validateFields() {
    this.setState({disabledButtons: !(this.state.sourceText && this.state.key)})
  }

  render() {
    return (
      <div>
        <label>Source text</label>
        <TextArea value={this.state.sourceText} onChange={this.changeText}/>
        <label>Key</label>
        <input type={'number'} value={this.state.key} onChange={this.changeKey}/>
        <div className={'btn-group'}>
          <Button  variant="outline-info" className={this.state.disabledButtons ? 'btn-grey' : 'btn-green'} onClick={this.codeText} disabled={this.state.disabledButtons}>Code</Button>
          <Button  variant="outline-info" className={this.state.disabledButtons ? 'btn-grey' : 'btn-green'} onClick={this.decodeText} disabled={this.state.disabledButtons}>Decode</Button>
        </div>
        <label>Result</label>
        <TextArea value={this.state.result} disabled/>
      </div>
    )
  }
}

export default Cipher