import React, { useState, useEffect } from 'react';
import { HttpRequest } from '../functions/axios/http';
import { url_project } from '../functions/axios/urls';
import { View, Text } from 'react-native';

import { type ProjectType } from '../Model/ProjectType';

export default function Projects() {
  const [_projects, setProject] = useState<ProjectType[] | null>();
  const [_projectLoaded, setProjectLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      setProjectLoaded(false);
      const res = await HttpRequest(url_project, 'get');
      if (res.length) {
        setProject(res);
        setProjectLoaded(true);
      }
    })();
  }, []);

  return (
    <View>
      {_projectLoaded ? (
        <View>
          {_projects.map((prj: ProjectType) => {
            return (
              <View>
                <Text>id: {prj.id} </Text>
                <Text>Title: {prj.title} </Text>
                <Text>Descriptionkk: {prj.description} </Text>
                <Text>Descriptionkk: {prj.createdAt.toString()} </Text>
                <Text>Descriptionkk: {prj.projectTypeId} </Text>
                <Text>Descriptionkk: {prj.endAt.toString()} </Text>
                <Text>Descriptionkk: {prj.UserNumber} </Text>
                <Text>Descriptionkk: {prj.updatedAt.toString()} </Text>
              </View>
            );
          })}
        </View>
      ) : (
        <Text>No user found, please try again</Text>
      )}
    </View>
  );
}
