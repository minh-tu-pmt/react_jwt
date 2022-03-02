import React, { PureComponent } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Cascader,
  Button,
  Icon,
  TimePicker,
  notification,
} from 'antd';
import moment from 'moment';
import BMap from 'BMap';
import styles from './Base.less';

const { TextArea, Search } = Input;
const FormItem = Form.Item;

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

@Form.create()
class Base extends PureComponent {
  state = {
    lng: '',
    lat: '',
    initLng:'',  //默认经度
    initLat:'',  //默认纬度
    ac: null,
  };

  componentDidMount() {
    this.renderMap();
  }

  //获取当前位置
  renderMap() {
    const _this = this;
    const map = new BMap.Map('mapBox');

    let ac = new BMap.Autocomplete({
      'input': 'searchVal',
      'location': map,
    });
    this.setState({ ac });

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        _this.setState({
          initLng:r.point.lng,
          initLat:r.point.lat
        })
        _this.locationPoint(map, r.point.lng, r.point.lat);
      }
    }, { enableHighAccuracy: true });
  }

  //设置地图定位
  locationPoint(map, lng, lat) {
    const _this = this;
    _this.setState({ lng, lat });
    map.clearOverlays();  //清楚地图上所有覆盖物
    map.enableScrollWheelZoom(true);
    map.enableDoubleClickZoom(true);
    var point = new BMap.Point(lng, lat);
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);
    map.centerAndZoom(point, 18);
    marker.setAnimation(BMAP_ANIMATION_BOUNCE);

    map.addEventListener('click', function(e) {
      _this.locationPoint(map, e.point.lng, e.point.lat);
    });
  }

  //根据搜索内容定位地址
  handleLocationSearch(val) {
    const _this = this;
    const map = new BMap.Map('mapBox');
    const myGeo = new BMap.Geocoder();

    if (!val) {
      _this.locationPoint(map, _this.state.initLng, _this.state.initLat)
      return;
    }

    myGeo.getPoint(val, function(point) {
      if (point) {
        _this.locationPoint(map, point.lng, point.lat);
      } else {
        notification.error({
          message: '定位失败',
          description: '请按照省市区县进行描述定位',
        });
      }
    }, '');
  }

  handleAdd() {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(keys.length);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleRemove(k) {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  renderContent() {
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const { lng, lat } = this.state;
    getFieldDecorator('keys', { initialValue: [0] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          style={{ marginBottom: '10px' }}
          label={index === 0 ? '营业电话' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`phone[${k}]`, {})(
            <Input placeholder="请输入手机号"/>,
          )}
          {keys.length > 1 ? (
            <Icon
              style={{ fontSize: '20px', marginTop: '6px', marginLeft: '15px' }}
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.handleRemove(k)}
            />
          ) : null}
        </FormItem>
      );
    });

    return [
      <div className={styles.logoBox} key='logo'>
        <label className={styles.label}>
          logo上传
        </label>
        <div className={styles.logo}>
          <div className={styles.avatar}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>
          </div>
          <Button icon="upload">上传logo</Button>
        </div>
      </div>,
      <FormItem label="场馆名称" key="venue_name">
        {getFieldDecorator('venue_name', {})(<Input placeholder="请输入场馆名称"/>)}
      </FormItem>,
      <FormItem label="品牌描述" key="brand_desc">
        {getFieldDecorator('brand_desc', {})(
          <TextArea placeholder="请输入品牌描述" rows={5}/>,
        )}
      </FormItem>,
      <FormItem label="省份/城市/区县" key="geographic">
        {getFieldDecorator('geographic', {})(
          <Cascader options={options} placeholder="请选择省份/城市/区县"/>,
        )}
      </FormItem>,
      <FormItem label="详细地址" key="address">
        {getFieldDecorator('address', {})(<Input placeholder="请输入详细地址"/>)}
      </FormItem>,
      <div className={styles.phoneGroup} key="phone">
        {formItems}
        <Button type="dashed" onClick={() => this.handleAdd()} style={{ width: '100%' }}>
          <Icon type="plus"/> 添加
        </Button>
      </div>,
      <div className={styles.timeGroup} key="time">
        <label className={styles.label}>
          营业时间
        </label>
        <Row gutter={24}>
          <Col lg={12} sm={24}>
            <FormItem key="start_time" style={{ width: '100%', marginBottom: '10px' }}>
              {getFieldDecorator('start_time', {})(<TimePicker format="HH:mm" placeholder="请输入开始营业时间" style={{ width: '100%' }}/>)}
            </FormItem>
          </Col>
          <Col lg={12} sm={24}>
            <FormItem key="end_time" style={{ width: '100%', marginBottom: '10px' }}>
              {getFieldDecorator('end_time', {})(<TimePicker format="HH:mm" placeholder="请输入结束营业时间" style={{ width: '100%' }}/>)}
            </FormItem>
          </Col>
        </Row>
        <FormItem key="desc" style={{ width: '100%' }}>
          {getFieldDecorator('desc', {})(<Input placeholder="特殊情况描述" style={{ width: '100%' }}/>)}
        </FormItem>
      </div>,
      <div className={styles.map} key="map">
        <label className={styles.label}>
          地图坐标
        </label>
        <div className={styles.inpStr}>
          <Search
            id="searchVal"
            placeholder="当前定位地址"
            onSearch={this.handleLocationSearch.bind(this)}
            enterButton
          />
        </div>
        <div className={styles.mapBox} id="mapBox"></div>
        <FormItem>
          {getFieldDecorator('lng', {
            initialValue: lng,
          })(<Input type="hidden"/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('lat', {
            initialValue: lat,
          })(<Input type="hidden"/>)}
        </FormItem>
      </div>,
      <FormItem label="大众点评链接" key="link">
        {getFieldDecorator('link', {})(<Input placeholder="请输入大众点评链接"/>)}
      </FormItem>,
      <Button key='btn' type='primary' htmlType="submit" style={{ width: '100%' }}>更新基本信息</Button>,
    ];
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        console.log(fieldsValue);
      }
    });
  }

  render() {
    return (
      <div className={styles.baseView}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onKeyDown={(e)=>{
              e.keyCode == 13 && e.preventDefault()
            }}
            onSubmit={this.handleSubmit.bind(this)}>
            {this.renderContent()}
          </Form>
        </div>
      </div>
    );
  }
}

export default Base;
