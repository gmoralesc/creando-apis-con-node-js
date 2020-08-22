// server/utils/index.js

const config = require('../config');

const { pagination, sort, populate } = config;

const paginationParseParams = ({
  limit = pagination.limit,
  page = pagination.page,
  skip = pagination.skip,
}) => ({
  limit: parseInt(limit, 10),
  page: parseInt(page, 10),
  skip: skip ? parseInt(skip, 10) : (page - 1) * limit,
});

const sortParseParams = (
  { sortBy = sort.sortBy.default, direction = sort.direction.default },
  fields
) => {
  const safelist = {
    sortBy: [...Object.getOwnPropertyNames(fields), ...sort.sortBy.fields],
    direction: sort.direction.options,
  };
  return {
    sortBy: safelist.sortBy.includes(sortBy) ? sortBy : sort.sortBy.default,
    direction: safelist.direction.includes(direction)
      ? direction
      : sort.direction.default,
  };
};

const sortCompactToStr = (sortBy, direction) => {
  const dir = direction === sort.direction.default ? '-' : '';
  return `${dir}${sortBy}`;
};

const filterByNested = (params, referencesNames) => {
  const paramsNames = Object.getOwnPropertyNames(params);
  const populateNames = referencesNames.filter(
    (item) => !paramsNames.includes(item)
  );

  return {
    filters: params,
    populate: populateNames.join(' '),
  };
};

const populateToObject = (populateNames, virtuals = {}) => {
  const virtualsNames = Object.getOwnPropertyNames(virtuals);
  return populateNames.map((item) => {
    let options = {};
    if (virtualsNames.includes(item)) {
      options = {
        limit: populate.virtuals.limit,
        sort: sortCompactToStr(
          populate.virtuals.sort,
          populate.virtuals.direction
        ),
      };
    }
    return {
      path: item,
      options,
    };
  });
};

module.exports = {
  paginationParseParams,
  sortParseParams,
  sortCompactToStr,
  filterByNested,
  populateToObject,
};
