import React, { useEffect, useState } from 'react';
import { GraphQLEditor, MainTheme } from 'graphql-editor';
import { PassedSchema } from 'graphql-editor';
import * as schemas from '../schema';

export const libraries = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: '',
  });
  useEffect(() => {
    setTimeout(
      () =>
        setMySchema((s) => ({
          ...s,
          code: '',
          libraries: schemas.usersLibraryNew,
        })),
      1000,
    );
    setTimeout(
      () =>
        setMySchema((s) => ({
          ...s,
          code: schemas.finance,
        })),
      2000,
    );
  }, []);
  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignSelf: 'stretch',
        display: 'flex',
        position: 'relative',
      }}
    >
      <GraphQLEditor
        theme={MainTheme}
        sidebarExpanded
        setSchema={(props) => {
          setMySchema(props);
        }}
        diffSchemas={{
          '1': schemas.finance + schemas.usersLibraryNew,
          '2': schemas.finance + schemas.usersLibraryOld,
        }}
        schema={mySchema}
      />
    </div>
  );
};

libraries.description =
  'Part of the schema of a company manager SaaS with diffs.';
