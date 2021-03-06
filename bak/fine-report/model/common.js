// @ts-ignore
import modelExtend from 'dva-model-extend';
export const model = {
    reducers: {
        updateState(state, { payload }) {
            return Object.assign({}, state, payload);
        },
    },
};
export const pageModel = modelExtend(model, {
    state: {
        list: [],
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `总共 ${total} 个项目`,
            current: 1,
            total: 0,
            pageSize: 10,
        },
    },
    reducers: {
        querySuccess(state, { payload }) {
            const { list, pagination } = payload;
            return Object.assign({}, state, { list, pagination: Object.assign({}, state.pagination, pagination) });
        },
    },
});
