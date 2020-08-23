import React, { ReactElement, useState, useEffect } from 'react';
import article from '@/modules/article';
import ArticleList from '@/components/ArticleList';
import { Checkbox, Divider } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import tagApi, { tagProps } from '@/modules/tag';

const CheckboxGroup = Checkbox.Group;

export default function TagView(): ReactElement {
  const [articleList, setArticleList] = useState([]);
  const [tags, setTags] = useState([]);

  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);

  const onChange = (checkedList: CheckboxValueType[]) => {
    setCheckedList(checkedList);
    setIndeterminate(!!checkedList.length && checkedList.length < tags.length);
    setCheckAll(checkedList.length === tags.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    let ids = tags.map((tag: any) => tag.value);
    setCheckedList(e.target.checked ? ids : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const getArtileList = async (params?: any) => {
    let {
      data: { data },
    } = await article.fetchAll(params);
    setArticleList(data);
  };

  const fetchAllTags = async () => {
    let {
      data: { data },
    } = await tagApi.fetchAll();
    let tags = data.map((tag: tagProps) => ({
      label: tag.name,
      value: tag.id,
    }));
    setTags(tags);
  };

  useEffect(() => {
    fetchAllTags();
  }, []);

  useEffect(() => {
    getArtileList({ tags: checkedList });
  }, [checkedList]);

  return (
    <div className={['container'].join(' ')}>
      <div
        style={{
          padding: 10,
          marginBottom: 15,
          borderBottom: '1px solid #ddd',
          textAlign: 'center',
        }}
      >
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          全选
        </Checkbox>
        <Divider type="vertical" />
        <CheckboxGroup options={tags} value={checkedList} onChange={onChange} />
      </div>
      <ArticleList dataSource={articleList} />
    </div>
  );
}
