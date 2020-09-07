import React from 'react';
import axios from 'axios';
import './Form.css';

class SphinxForm extends React.Component {
  state = {
    title: '',
    description: '',
    location: '',
    posts: [],
  };
  componentDidMount = () => {
    // this.getRecentUpdates();
  };

  getRecentUpdates = () => {
    axios
      .get('/joca')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Data has been received on the database');
      })
      .catch(() => {
        alert('Error retrieving data');
      });
  };
  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    alert('Message has been submitted to the database');

    const payload = {
      title: this.state.title,
      description: this.state.description,
      location: this.state.location,
    };

    axios({
      url: '/joca/save',
      method: 'POST',
      data: payload,
    })
      .then(() => {
        console.log('Data has been sent ');
        this.resetUserInput();
        this.getRecentUpdates();
      })
      .catch(() => {
        console.log('Internal server error');
      });
  };
  resetUserInput = () => {
    this.setState({
      title: '',
      description: '',
      location: '',
    });
  };
  displayRecentUpdates = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="display-post">
        <div>
          <h3>City Name : {post.title}</h3>
        </div>
        <div>
          <h3>Description : {post.description}</h3>
        </div>
        <div>
          <h3>Location : {post.location}</h3>
        </div>
      </div>
    ));
  };

  render() {
    console.log('state', this.state);
    return (
      <div className="app">
        <div className="row">
          <div className="col-md-3 offset-md-2">
            {' '}
            <h2 className="text-center">Sphinxnautics</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-input">
                <h3>City Name</h3>
                <input
                  placeholder="City Name"
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-input">
                <h3>Description</h3>
                <input
                  placeholder="Description"
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  required
                ></input>
              </div>
              <div className="form-input">
                <h3>Geographical Location</h3>
                <input
                  placeholder="Geographical Location"
                  type="text"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleChange}
                  required
                ></input>
              </div>
              <button>Save to Database</button>
            </form>
            {/* <div>{this.displayRecentUpdates(this.state.posts)}</div> */}
          </div>
        </div>
        <div className="col-md-3 offset-md-2">
          <h2>To get Recent Updates from the database</h2>
          <button onClick={this.displayRecentUpdates}>Recent Updates</button>
          <div>{this.displayRecentUpdates(this.state.posts)}</div>
        </div>
      </div>
    );
  }
}

export default SphinxForm;
