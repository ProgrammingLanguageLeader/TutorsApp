import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, Cell, Avatar, Button, Input, FormLayout,
  Textarea, HeaderButton, Group, FormStatus
} from '@vkontakte/vkui';

import BackIcon from 'vk-apps-frontend/components/BackIcon';
import DivSpinner from 'vk-apps-frontend/components/DivSpinner';

import { ROOT_URL } from 'vk-apps-frontend/constants';
import { locationActions  } from 'vk-apps-frontend/actions';
import { usersActions, vkAppsUsersActions } from 'vk-apps-frontend/actions/api';

const mapStateToProps = state => {
  const { vkUserInfo } = state.vkReducer.appsUserReducer;
  const { user, vkId } = state.apiReducer.vkAppsUsersReducer;
  const fetching = state.apiReducer.vkAppsUsersReducer.fetching || state.apiReducer.usersReducer.fetching;
  const { errors } = state.apiReducer.usersReducer;
  return {
    vkUserInfo, user, fetching, errors, vkId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goBack: bindActionCreators(locationActions.goBack, dispatch),
    changeLocation: bindActionCreators(locationActions.changeLocation, dispatch),
    getVkAppsUser: bindActionCreators(vkAppsUsersActions.getVkAppsUser, dispatch),
    updateUser: bindActionCreators(usersActions.updateUser, dispatch),
  }
};

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      experience: '',
      education: '',
      city: '',
      district: '',
      street: '',
      metro_station: '',
      bio: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.vkUserInfo;
    this.props.getVkAppsUser(id);
  }

  componentWillReceiveProps(nextProps) {
    const { first_name, last_name, experience, education, city, district, street, metro_station, bio } = nextProps.user;
    this.setState({ first_name, last_name, experience, education, city, district, street, metro_station, bio });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      const { id } = this.props.user;
      await this.props.updateUser(id, {
        ...this.state
      });
    }
    catch (exception) {
      console.log(exception);
    }

    const { vkId } = this.props;
    await this.props.getVkAppsUser(vkId);
  }

  render() {
    const { user, fetching, errors } = this.props;
    const { experience, education, city, district, street, metro_station, bio } = this.state;

    return (
      <View id={this.props.id} activePanel="edit_profile">
        <Panel id="edit_profile">
          <PanelHeader
            left={
              <HeaderButton onClick={this.props.goBack}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Изменение профиля
          </PanelHeader>
          {
            fetching
            ? (
              <DivSpinner />
            )
            : (
              <div>
                <Group>
                  <Cell
                    size="l"
                    multiline
                    description="Здесь можно посмотреть и отредактировать публичную информацию о Вашем профиле"
                    before={<Avatar size={80} src={ROOT_URL + user.avatar} />}
                  >
                    {`${user.first_name} ${user.last_name}`}
                  </Cell>
                </Group>
                <Group title="Информация о пользователе">
                  <FormLayout>
                    {
                      errors
                      ? (
                        <FormStatus title="Некорректные данные" state="error">
                          Проверьте заполненные поля: {JSON.stringify(errors)}
                        </FormStatus>
                      )
                      : null
                    }
                    <Input
                      name="experience"
                      top="Опыт преподавания"
                      value={experience ? experience : ""}
                      onChange={this.handleChange}
                    />

                    <Input
                      name="education"
                      top="Образование"
                      value={education ? education : ""}
                      onChange={this.handleChange}
                    />

                    <Input
                      name="city"
                      top="Город"
                      value={city ? city : ""}
                      onChange={this.handleChange}
                    />

                    <Input
                      name="district"
                      top="Район"
                      value={district ? district : ""}
                      onChange={this.handleChange}
                    />

                    <Input
                      name="street"
                      top="Улица"
                      value={street ? street : ""}
                      onChange={this.handleChange}
                    />

                    <Input
                      name="metro_station"
                      top="Станция метро"
                      value={metro_station ? metro_station : ""}
                      onChange={this.handleChange}
                    />

                    <Textarea
                      name="bio"
                      top="О себе"
                      value={bio ? bio : ""}
                      onChange={this.handleChange}
                    />
                    <Button size="xl" onClick={this.handleSubmit}>
                      Сохранить
                    </Button>
                  </FormLayout>
                </Group>
              </div>
            )
          }
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
