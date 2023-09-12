import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modern-datepicker"; // Import DateTimePickerModal

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [sortOption, setSortOption] = useState("name");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleDateConfirm = (date) => {
    setDueDate(date);
    hideDatePicker();
  };

  const addTask = () => {
    if (task.trim() !== "" && category.trim() !== "") {
      const newTask = {
        text: task,
        completed: false,
        category: category,
        dueDate: dueDate,
      };
      setTasks([...tasks, newTask]);
      setTask("");
      setCategory("");
      setDueDate(new Date());
    }

    setDatePickerVisibility(false);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const clearCompletedTasks = () => {
    const newTasks = tasks.filter((task) => !task.completed);
    setTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Category/Tag"
        value={category}
        onChangeText={(text) => setCategory(text)}
      />

      <Icon
        name="calendar"
        style={styles.calendarIcon}
        onPress={() => setDatePickerVisibility(!isDatePickerVisible)}
        size={24}
        color="blue"
      />
      {isDatePickerVisible && (
        <DateTimePickerModal
          mode="datetime"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <Picker
          style={styles.sortPicker}
          selectedValue={sortOption}
          onValueChange={(itemValue) => setSortOption(itemValue)}
        >
          <Picker.Item label="Task Name" value="name" />
          <Picker.Item label="Due Date" value="dueDate" />
        </Picker>
      </View>

      <FlatList
        data={tasks.sort((a, b) => {
          if (sortOption === "name") {
            return a.text.localeCompare(b.text);
          } else if (sortOption === "dueDate") {
            return a.dueDate - b.dueDate;
          }
        })}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            {item.completed ? (
              <Icon
                name="checkmark-circle"
                style={styles.completedIcon}
                size={24}
                color="green"
              />
            ) : null}
            <View style={styles.alignItems}>
              <Text
                style={
                  item.completed ? styles.completedTaskText : styles.taskText
                }
                onPress={() => toggleTaskCompletion(index)}
              >
                {item.text}
              </Text>
              <Text style={styles.categoryText}>Category: {item.category}</Text>
            </View>
            <Text style={styles.dueDateText}>
              {item.dueDate.toLocaleDateString()}{" "}
            </Text>
            <TouchableOpacity onPress={() => removeTask(index)}>
              <Icon name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button
        title="Clear Completed Tasks"
        onPress={clearCompletedTasks}
        color="red"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedTaskText: {
    flex: 1,
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "gray",
  },
  alignItems: {
    flex: 1,
  },
  categoryText: {
    fontSize: 14,
    color: "gray",
  },
  completedIcon: {
    marginRight: 10,
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sortLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  sortPicker: {
    flex: 1,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  datePickerLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  datePicker: {
    flex: 1,
  },
  dueDateText: {
    color: "gray",
  },
});
