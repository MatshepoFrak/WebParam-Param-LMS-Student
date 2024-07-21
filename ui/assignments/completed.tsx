export default function CompletedAssignment() {
    return (
        <table className="rbt-table table table-borderless">
        <thead>
          <tr>
            <th>Assignment Name</th>
            <th>Total Marks</th>
            <th>Total Submit</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <span className="h6 mb--5">
                Write Link short essay on yourself using the 5
              </span>
              <p className="b3">
                Module:{" "}
                <a href="/instructor/instructor-assignments#">
                  Fundamentals 101
                </a>
              </p>
            </th>
            <td>
              <p className="b3">80</p>
            </td>
            <td>
              <p className="b3">2</p>
            </td>
            <td>
              <div className="rbt-button-group justify-content-end">
                <a
                  className="rbt-btn btn-xs bg-primary-opacity radius-round"
                  title="Edit"
                  href="#"
                >
                  <i className="feather-edit pl--0" /> Edit
                </a>
               
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <span className="h6 mb--5">Public Speaking for Beginners</span>
              <p className="b3">
                Module:{" "}
                <a href="#">Speaking 101</a>
              </p>
            </th>
            <td>
              <p className="b3">20</p>
            </td>
            <td>
              <p className="b3">3</p>
            </td>
            <td>
              <div className="rbt-button-group justify-content-end">
                <a
                  className="rbt-btn btn-xs bg-primary-opacity radius-round"
                  title="Edit"
                  href="#"
                >
                  <i className="feather-edit pl--0" /> Edit
                </a>
               
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <span className="h6 mb--5">Project Integration Management 101</span>
              <p className="b3">
                Module:{" "}
                <a href="#">Project Integration Management</a>
              </p>
            </th>
            <td>
              <p className="b3">60</p>
            </td>
            <td>
              <p className="b3">10</p>
            </td>
            <td>
              <div className="rbt-button-group justify-content-end">
                <a
                  className="rbt-btn btn-xs bg-primary-opacity radius-round"
                  title="Edit"
                  href="#"
                >
                  <i className="feather-edit pl--0" /> Edit
                </a>
                
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <span className="h6 mb--5">Fundamentals 101</span>
              <p className="b3">
                Module:{" "}
                <a href="/#">Project Time Management</a>
              </p>
            </th>
            <td>
              <p className="b3">40</p>
            </td>
            <td>
              <p className="b3">15</p>
            </td>
            <td>
              <div className="rbt-button-group justify-content-end">
                <a
                  className="rbt-btn btn-xs bg-primary-opacity radius-round"
                  title="Edit"
                  href="#"
                >
                  <i className="feather-edit pl--0" /> Edit
                </a>
              
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    )
}