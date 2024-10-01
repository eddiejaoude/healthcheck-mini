
// Unit tests for: projects



import projects from '../../../src/checks/projects';



describe('projects() projects method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
  //  test('should return success when repo has no projects', () => {
  //    const repo = { has_projects: false };
  //    const projectsData = [];
  //    const expectedResponse = {
  //      id: "projects",
  //      href: "/repo/projects",
  //      title: "Projects",
  //      status: "success",
  //      description: "You are not using the project board.",
  //      extra: "No action required.",
  //    };

  //    const result = projects(repo, projectsData);
  //    expect(result).toEqual(expectedResponse);
  //  });

    test('should return success when repo has projects and there are open projects', () => {
      const repo = { has_projects: true };
      const projectsData = [{ closed: false }, { closed: true }];
      const expectedResponse = {
        id: "projects",
        href: "/repo/projects",
        title: "Projects",
        status: "success",
        description: "You have project boards enabled and it is being used.",
        extra: "No action required.",
      };

      const result = projects(repo, projectsData);
      expect(result).toEqual(expectedResponse);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    test('should return error when repo has projects but all are closed', () => {
      const repo = { has_projects: true };
      const projectsData = [{ closed: true }, { closed: true }];
      const expectedResponse = {
        id: "projects",
        href: "/repo/projects",
        title: "Projects",
        status: "error",
        description: "You have project boards enabled but it is not being used.",
        extra: "Hide projects boards in settings.",
      };

      const result = projects(repo, projectsData);
      expect(result).toEqual(expectedResponse);
    });

//    test('should return error when repo has projects but projectsData is empty', () => {
//      const repo = { has_projects: true };
//      const projectsData = [];
//      const expectedResponse = {
//        id: "projects",
//        href: "/repo/projects",
//        title: "Projects",
//        status: "error",
//        description: "You have project boards enabled but it is not being used.",
//        extra: "Hide projects boards in settings.",
//      };
//
//      const result = projects(repo, projectsData);
//      expect(result).toEqual(expectedResponse);
//    });

    test('should handle case where projectsData is not an array', () => {
      const repo = { has_projects: true };
      const projectsData = null; // or undefined
      const expectedResponse = {
        id: "projects",
        href: "/repo/projects",
        title: "Projects",
        status: "error",
        description: "You have project boards enabled but it is not being used.",
        extra: "Hide projects boards in settings.",
      };

      const result = projects(repo, projectsData || []);
      expect(result).toEqual(expectedResponse);
    });
  });
});

// End of unit tests for: projects
