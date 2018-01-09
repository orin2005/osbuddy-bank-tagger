import React, { Component } from 'react';
import { Grid, Row, Col, Form, FormGroup, Button, FormControl } from 'react-bootstrap';
import fs from 'fs';
import { remote } from 'electron';

import Item from './Item';

import items from './constants';


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      unselectedItems: [],
      selectedItems: [],
      tag: 'generatedTag',
      searchText: 'test'
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleUnselect = this.handleUnselect.bind(this);
    this.exportTag = this.exportTag.bind(this);
    this.searchItems = this.searchItems.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleSelect(item) {

    const { selectedItems } = this.state;
    console.log(item);
    const arr = [];
    selectedItems.forEach(d => arr.push(d));
    arr.push(item);
    this.setState({ selectedItems: arr });
  }

  handleUnselect(item) {
    const { selectedItems } = this.state;
    const arr = [];
    selectedItems.forEach(d => arr.push(d));
    const index = arr.findIndex((i) => i.id === item.id);
    console.log(index);
    arr.splice(index, 1);
    this.setState({ selectedItems: arr });
  }

  exportTag() {
    const allIds = this.state.selectedItems.map(si => `{\\"id\\":${si.id}}`);
    allIds.slice(0, allIds.length - 1);

    const fileName = remote.dialog.showSaveDialog({ title: 'Save the tag' });

    fs.writeFile(fileName, `{"enabled":{"type":"hidden","value":"true"},"tags":{"type":"hidden","value":"[{\\"tag\\":\\"${this.state.tag}\\",\\"ids\\":[${allIds}]}]"}}`, (err) => {
      if (err) {
        return console.log(err);
      }

      console.log('The file was saved!');
    });

  }


  handleTextChange(evt) {
    this.setState({ tag: evt.target.value });
    console.log(this.state.tag);
  }

  searchItems() {
    this.setState({ unselectedItems: items.filter((str) => str.name.toLowerCase().includes(
      this.state.searchText.toLowerCase()) && true) });
  }

  handleSearchTextChange(evt) {
    this.setState({ searchText: evt.target.value }, () => {
      if (this.state.searchText.length >= 3) {
        this.searchItems();
      }
    });
    console.log(evt.target.value);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={6}>
            <div className={'items-box'}>
              <Row>
                {this.state.unselectedItems.map(d =>
                  (<Col
                    key={d.id}
                    xs={3}
                    onClick={() => this.handleSelect(d)}
                  >
                    <Item item={d} />
                  </Col>)
                )}
              </Row>
            </div>
          </Col>
          <Col xs={2} />
          <Col xs={6}>
            <div className={'items-box'}>
              <Row>
                {this.state.selectedItems.map( d => (
                  <Col
                    key={d.id}
                    xs={3}
                    onClick={() => this.handleUnselect(d)}
                  >
                    <Item item={d} />
                  </Col>))}
              </Row>
            </div>
          </Col>
          <Col xs={1} />
        </Row>
        <Row>
          <Col xs={1} />
          <Col xs={5}>
            <Form inline>
              <FormGroup controlId="formInlineName">
                <FormControl type="text" placeholder="Enter text to search" onChange={(evt) => this.handleSearchTextChange(evt)} />
              </FormGroup>
              {' '}
              <Button onClick={() => this.searchItems()}>
                Search
              </Button>
            </Form>
          </Col>
          <Col xs={1} />
          <Col xs={5}>
            <Form inline>
              <FormGroup controlId="formInlineName">
                <FormControl type="text" placeholder="Tag name" onChange={(evt) => this.handleTextChange(evt)} />
              </FormGroup>
              {' '}
              <Button onClick={() => this.exportTag()}>
                Export tag
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
        </Row>
      </Grid>
    );
  }
}
