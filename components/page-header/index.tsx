/* @ts-ignore */
import { PureComponent, createElement } from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';
// @ts-ignore
import pathToRegexp from 'path-to-regexp';
import { Breadcrumb, Tabs } from 'antd';
import classNames from 'classnames';
import { urlToList } from '../_util/pathTools';

const { TabPane } = Tabs;
export function getBreadcrumb(breadcrumbNameMap: any, url: any) {
  let breadcrumb = breadcrumbNameMap[url];
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach(item => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item];
      }
    });
  }
  return breadcrumb || {};
}

interface IPageHeaderProps {
  tabActiveKey?: any;
  onTabChange?: any;
  routes?: any;
  params?: any;
  location?: any;
  breadcrumbNameMap?: any;
  breadcrumbList?: any;
  breadcrumbSeparator?: any;
  linkElement?: any;
  title?: any;
  logo?: any;
  action?: any;
  content?: any;
  tabList?: any;
  extraContent?: any;
  tabDefaultActiveKey?: any;
  className?: any;
  tabBarExtraContent?: any;
}

export default class PageHeader extends PureComponent<IPageHeaderProps, any> {
  static contextTypes = {
    routes: PropTypes.array,
    params: PropTypes.object,
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };

  state = {
    breadcrumb: null,
  };

  componentDidMount() {
    this.getBreadcrumbDom();
  }

  componentDidUpdate(preProps: IPageHeaderProps) {
    const { tabActiveKey } = this.props;
    if (preProps.tabActiveKey !== tabActiveKey) {
      this.getBreadcrumbDom();
    }
  }

  onChange = (key: any) => {
    const { onTabChange } = this.props;
    if (onTabChange) {
      onTabChange(key);
    }
  };

  getBreadcrumbProps = () => {
    const { routes, params, location, breadcrumbNameMap } = this.props;
    const {
      routes: croutes,
      params: cparams,
      location: clocation,
      breadcrumbNameMap: cbreadcrumbNameMap,
    } = this.context;
    return {
      routes: routes || croutes,
      params: params || cparams,
      routerLocation: location || clocation,
      breadcrumbNameMap: breadcrumbNameMap || cbreadcrumbNameMap,
    };
  };

  getBreadcrumbDom = () => {
    const breadcrumb = this.conversionBreadcrumbList();
    this.setState({
      breadcrumb,
    });
  };

  // Generated according to props
  conversionFromProps = () => {
    const { breadcrumbList, breadcrumbSeparator, linkElement = 'a' } = this.props;
    return (
      <Breadcrumb className="breadcrumb" separator={breadcrumbSeparator}>
        {breadcrumbList.map((item: any) => (
          <Breadcrumb.Item key={item.title}>
            {item.href
              ? createElement(
                linkElement,
                {
                  [linkElement === 'a' ? 'href' : 'to']: item.href,
                },
                item.title
              )
              : item.title}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  };

  conversionFromLocation = (routerLocation: any, breadcrumbNameMap: any) => {
    const { breadcrumbSeparator, linkElement = 'a' } = this.props;
    // Convert the url to an array
    const pathSnippets = urlToList(routerLocation.pathname);
    // Loop data mosaic routing
    const extraBreadcrumbItems = pathSnippets.map((url, index) => {
      const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
      const isLinkable = index !== pathSnippets.length - 1 && currentBreadcrumb.component;
      return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
        <Breadcrumb.Item key={url}>
          {createElement(
            isLinkable ? linkElement : 'span',
            { [linkElement === 'a' ? 'href' : 'to']: url },
            currentBreadcrumb.name
          )}
        </Breadcrumb.Item>
      ) : null;
    });
    // Add home breadcrumbs to your head
    extraBreadcrumbItems.unshift(
      <Breadcrumb.Item key="home">
        {createElement(
          linkElement,
          {
            [linkElement === 'a' ? 'href' : 'to']: '/',
          },
          '首页'
        )}
      </Breadcrumb.Item>
    );
    return (
      <Breadcrumb className="breadcrumb" separator={breadcrumbSeparator}>
        {extraBreadcrumbItems}
      </Breadcrumb>
    );
  };

  /**
   * 将参数转化为面包屑
   * Convert parameters into breadcrumbs
   */
  conversionBreadcrumbList = () => {
    const { breadcrumbList, breadcrumbSeparator } = this.props;
    const { routes, params, routerLocation, breadcrumbNameMap } = this.getBreadcrumbProps();
    if (breadcrumbList && breadcrumbList.length) {
      return this.conversionFromProps();
    }
    // 如果传入 routes 和 params 属性
    // If pass routes and params attributes
    if (routes && params) {
      return (
        <Breadcrumb
          className="breadcrumb"
          routes={routes.filter((route: any) => route.breadcrumbName)}
          params={params}
          itemRender={this.itemRender}
          separator={breadcrumbSeparator}
        />
      );
    }
    // 根据 location 生成 面包屑
    // Generate breadcrumbs based on location
    if (routerLocation && routerLocation.pathname) {
      return this.conversionFromLocation(routerLocation, breadcrumbNameMap);
    }
    return null;
  };

  // 渲染Breadcrumb 子节点
  // Render the Breadcrumb child node
  // @ts-ignore
  itemRender = (route, params, routes, paths) => {
    const { linkElement = 'a' } = this.props;
    const last = routes.indexOf(route) === routes.length - 1;
    return last || !route.component ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      createElement(
        linkElement,
        {
          href: paths.join('/') || '/',
          to: paths.join('/') || '/',
        },
        route.breadcrumbName
      )
    );
  };

  render() {
    const {
      title,
      logo,
      action,
      content,
      extraContent,
      tabList,
      className,
      tabActiveKey,
      tabDefaultActiveKey,
      tabBarExtraContent,
    } = this.props;
    const { breadcrumb } = this.state;

    const clsString = classNames('ant-page-header', className);
    const activeKeyProps: any = {};
    if (tabDefaultActiveKey !== undefined) {
      activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
    }
    if (tabActiveKey !== undefined) {
      activeKeyProps.activeKey = tabActiveKey;
    }

    return (
      <div className={clsString}>
        {breadcrumb}
        <div className="detail">
          {logo && <div className="logo">{logo}</div>}
          <div className="main">
            <div className="row">
              {title && <h1 className="title">{title}</h1>}
              {action && <div className="action">{action}</div>}
            </div>
            <div className="row">
              {content && <div className="content">{content}</div>}
              {extraContent && <div className="extraContent">{extraContent}</div>}
            </div>
          </div>
        </div>
        {tabList && tabList.length && (
          <Tabs
            className="tabs"
            {...activeKeyProps}
            onChange={this.onChange}
            tabBarExtraContent={tabBarExtraContent}
          >
            {tabList.map((item: any) => (
              <TabPane tab={item.tab} key={item.key} />
            ))}
          </Tabs>
        )}
      </div>
    );
  }
}
