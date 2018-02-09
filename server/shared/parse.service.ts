const parseService = {

  parseShedules: function (project, schedules) {
    const parsed = [];
    if (Array.isArray(schedules)) {
      for (const schedule of schedules) {
        const s = JSON.parse(schedule);

        parsed.push(
          {
            projectid: project.id,
            employeeid: s.employee.id,
            roleid: s.role.id,
            participation: s.participation,
          }
        );
      }

    } else {
      if (schedules) {
        const s = JSON.parse(schedules);
        parsed.push(
          {
            projectid: project.id,
            employeeid: s.employee.id,
            roleid: s.role.id,
            participation: s.participation,
          }
        );
      }
    }

    return parsed;
  },

  parseTechnology: function (technologies) {
    const parsed = [];
    if (Array.isArray(technologies)) {
      for (const tech of technologies) {
        const t = JSON.parse(tech);

        parsed.push(
          {
            id: t.id,
            name: t.name,
            domain: t.domain,
            active: 0
          }
        );
      }

    } else {
      if (technologies) {
        const t = JSON.parse(technologies);
        parsed.push(
          {
            id: t.id,
            name: t.name,
            domain: t.domain,
            active: 0
          }
        );
      }
    }
    return parsed;

  }
};

export default parseService;
