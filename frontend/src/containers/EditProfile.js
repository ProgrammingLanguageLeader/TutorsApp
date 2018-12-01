import React from 'react';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, Cell, Avatar, Button, File, Input, FormLayout, 
  Textarea, HeaderButton
} from '@vkontakte/vkui';
import Icon24Document from '@vkontakte/icons/dist/24/document';

import BackIcon from '../components/BackIcon';
import DivSpinner from '../components/DivSpinner';

import { apiActions } from '../actions/api';
import { locationActions } from '../actions/location';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: '',
      education: '',
      address: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    const { id, signed_user_id } = this.props.userInfo;
    this.props.dispatch(
      apiActions.getProfile({
        profile_id: id,
        user_id: id,
        signed_user_id: signed_user_id,
      })
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.profile
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  updateProfile(event) {
    event.preventDefault();

    const { id, signed_user_id } = this.props.userInfo;
    this.props.dispatch(
      apiActions.updateProfile({
        user_id: id,
        signed_user_id: signed_user_id,
        ...this.state
      })
    )
    .then(() => {
      this.props.dispatch(locationActions.changeLocation('show_profile'));
    })
  }

  render() {
    const { fetching } = this.props;
    const { city, photo_200, first_name, last_name } = this.props.userInfo;
    const { description, experience, education, address } = this.state;

    return (
      <View 
        id={this.props.id} 
        activePanel="edit_profile"
      >
        <Panel id="edit_profile" theme="white">					
          <PanelHeader
            left={
              <HeaderButton key="back" onClick={() => this.props.dispatch(locationActions.goBack())}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Профиль
          </PanelHeader>
          { fetching ? (
            <DivSpinner />
          ) : (
            <FormLayout style={{ paddingBottom: 80 }}>
              <Cell
                size="l"
                description={city ? city.title : ""}
                before={<Avatar src={photo_200} />}
              >
                {`${first_name} ${last_name}`}
              </Cell>

              <Input
                name="experience"
                top="Стаж преподавания" 
                value={experience ? experience : ""}
                onChange={this.handleChange}
              />
              
              <Input
                name="education"
                top="Образование"
                bottom='Прикрепите копии документов об образовании и трудовом стаже, если хотите разместить свою заявку с пометкой "Проверенный специалист"'
                value={education ? education : ""}
                onChange={this.handleChange}
              />
                <File before={<Icon24Document />} size="l" />
              
              <Input 
                name="address"
                top="Адрес" 
                value={address ? address : ""}
                onChange={this.handleChange}
              />
              
              <Textarea 
                name="description"
                top="О себе" 
                value={description ? description : ""} 
                onChange={this.handleChange}
              />
              <Button size="xl" onClick={this.updateProfile}>
                Сохранить
              </Button>
            </FormLayout>
          )}
        </Panel>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  const { userInfo } = state.vkReducer;
  const { fetching } = state.apiReducer;
  const { profile } = state.apiReducer;
  return {
    userInfo, fetching, profile, 
  };
}

export default connect(mapStateToProps)(EditProfile);
