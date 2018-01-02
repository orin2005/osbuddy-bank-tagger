import React, {Component} from 'react';

export default class Item extends Component {

  render()
  {
    return (
      <div className={"item"}>
        <div className={"img-container"}>
          <img src={"./img/"+this.props.item.id+".png"} title={this.props.item.name}/>
        </div>
      </div>
    );
  }
}
